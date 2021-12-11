const UI = {
    form: document.querySelector('form'),
    input: document.querySelector('input'),
    output: document.querySelector('.output'),
    output2: document.querySelector('.output2')

}

UI.form.addEventListener('submit', function () {
    const firstName = UI.input.value;

    const serverUrl = 'https://api.genderize.io';
    const urlMy = `${serverUrl}?name=${firstName}`;

    fetch(urlMy)
        .then(response => response.json())
        .then(answer => UI.output.textContent = `${answer.name} is ${answer.gender}`);

    const countryServerUrl = 'https://api.nationalize.io';
    const urlMy2 = `${countryServerUrl}?name=${firstName}`;

    fetch(urlMy2)
        .then(response => response.json())
        .then(data2 => {
            UI.output2.textContent = `${data2.name} from `;
            let countries = data2.country.map(item => item.country_id);
            countries.forEach(element => {
                UI.output2.textContent += `${element} or `;
            });
            UI.output2.textContent = UI.output2.textContent.slice(0, -4);
        });

    input.value = '';
});

