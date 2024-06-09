const modalWindow = $.modal({
    title:'sklayp',
    closable: true,
    content: `<p>THIS IS MODAL WINDOW</p>`,
    width:'1000px',
    footer: [{
        text:'OK',
        type:'primary',
        handler(){console.log('OK was clicked!')}
    },
    {
        text:'Close',
        type:'primary',
        handler(){console.log('FUCK was clicked!')
            modalWindow.close();
        }
    }]
});