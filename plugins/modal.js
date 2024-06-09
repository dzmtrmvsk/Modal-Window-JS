Element.prototype.appendAfter = function(element){
    element.parentNode.insertBefore(this,element.nextSibling);
}

function _createModalFooter(buttons = []){
    if(buttons.length === 0){
        return document.createElement('div');
    }
    const wrap = document.createElement('div');
    wrap.classList.add('modal-footer');
    buttons.forEach(btn=>{
        const _btn = document.createElement('button');
        _btn.textContent = btn.text;
        _btn.classList.add('btn');
        _btn.classList.add(`btn-${btn.type || 'btn-secondary'}`);
        _btn.addEventListener('click',btn.handler || console.log('Handler doesnt exist'));
        wrap.append(_btn);
    })
    return wrap;
}

function _createModal(options) {
    const DEFAULT_WIDTH = '700px'
    const modal = document.createElement('div');
    modal.classList.add('vmodal');
    modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close="true">
    <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
        <div class="modal-header">
            <span class="modal-title">${options.title || 'Окно'}</span>
            ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ``}
        </div>
        <div class="modal-body" data-contentSet>
            ${options.content || ''}
        </div>
    </div>
</div>`);
    const footer = _createModalFooter(options.footer);
    footer.appendAfter(modal.querySelector('[data-contentSet]'));
    document.body.appendChild(modal);
    return modal;
}

$.modal = function (options) {
    const ANIMATION_SPEED = 200;
    const $modalWindow = _createModal(options);
    let destroyed = false;
    const modalResult = {
        open() {
            if(destroyed){
                return console.log('Modal window was destroyed!');
            }
            $modalWindow.classList.add('open');
        },

        close() {
            if(destroyed || !$modalWindow.classList.contains('open')){
                return console.log('Nothing to close!');
            }
            $modalWindow.classList.remove('open');
            $modalWindow.classList.add('hide');
            setTimeout(() => {
                $modalWindow.classList.remove('hide');
            }, ANIMATION_SPEED);
        },
    }

    const listener = event=>{
        if(event.target.dataset.close){
            modalResult.close();
        }
    }

    $modalWindow.addEventListener('click', listener)

    return Object.assign(modalResult,{
        destroy(){
            if(destroyed){
                return;
            }
            $modalWindow.parentElement.removeChild($modalWindow);
            destroyed = true;
            $modalWindow.removeEventListener('click',listener);
        },

        setContent(HTML){
            $modalWindow.querySelector('[data-contentSet]').innerHTML = HTML;
        }
    });
}