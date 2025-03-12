export function initCustomSelect() {
    document.querySelectorAll('.custom-select').forEach(select => {
        const selected = select.querySelector('.selected');
        const options = select.querySelector('.options');

        // Открываем/закрываем список при клике
        selected.addEventListener('click', () => {
            const isOpen = options.style.display === 'block';
            options.style.display = isOpen ? 'none' : 'block';
            select.classList.toggle('open', !isOpen);
        });

        // Выбираем опцию
        options.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', () => {
                selected.textContent = option.textContent;
                options.style.display = 'none';
                select.classList.remove('open');
            });
        });

        // Закрываем список при клике вне его
        document.addEventListener('click', (event) => {
            if (!select.contains(event.target)) {
                options.style.display = 'none';
                select.classList.remove('open');
            }
        });
    });
}