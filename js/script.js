const UI = {
    form: document.querySelector('form'),
    nameInput: document.querySelector('input'),
    genderOutput: document.querySelector('.gender-output'),
    countryOutput: document.querySelector('.country-output')
}

const URLs = {
    genderServerUrl: 'https://api.genderize.io',
    countryServerUrl: 'https://api.nationalize.io'
}

UI.form.addEventListener('submit', function () {
    const firstName = UI.nameInput.value;
    const genderRequest = `${URLs.genderServerUrl}?name=${firstName}`;
    const countryRequest = `${URLs.countryServerUrl}?name=${firstName}`;

    fetch(genderRequest)
        .then(response => response.json())
        .then(answer => UI.genderOutput.textContent = `${answer.name} is ${answer.gender}`);

    fetch(countryRequest)
        .then(response => response.json())
        .then(answer => {
            UI.countryOutput.textContent = `${answer.name} is from `;
            let countries = answer.country.map(item => item.country_id);
            countries.forEach(country => {
                UI.countryOutput.textContent += `${country} or `;
            });
            UI.countryOutput.textContent = UI.countryOutput.textContent.slice(0, -4);
        });

    UI.form.reset();
});

