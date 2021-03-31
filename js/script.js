const grid = new Muuri('.grid', {
    layout: {
        rounding: false
    }
});

window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('img-loaded');

    const links = document.querySelectorAll('#categories a');
    links.forEach((element) => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            links.forEach((links) => links.classList.remove('active'));
            e.target.classList.add('active');

            const category = e.target.innerHTML.toLowerCase();
            category === 'todos' ? grid.filter('[data-category]') : grid.filter(`[data-category= "${category}"]`);
        })
    });

    document.querySelector('#search-bar').addEventListener('input', (e) => {
        const search = e.target.value;
        grid.filter((item) => item.getElement().dataset.etiquet.includes(search))
    });

    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((element) => {
        element.addEventListener('click', () => {
            const rute = element.getAttribute('src');
            const description = element.parentNode.parentNode.dataset.description;

            overlay.classList.add('active')
            document.querySelector('#overlay img').src = rute;
            document.querySelector('#overlay .description').innerHTML = description;
        })
    });

    document.querySelector('#btn-exit-popup').addEventListener('click', () => {
        overlay.classList.remove('active');
    })

    overlay.addEventListener('click', (event) => {
        event.target.id === 'overlay' ? overlay.classList.remove('active') : '';
    })
});