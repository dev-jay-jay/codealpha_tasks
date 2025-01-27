
const birthdayInput = document.getElementById('birthday');
const birthTimeInput = document.getElementById('birth-time');
const timezoneSelect = document.getElementById('timezone');
const calculateButton = document.getElementById('calculate-button');
const ageResults = document.getElementById('age-results');
const predictorBirthdayInput = document.getElementById('predictor-birthday');
const predictorDateInput = document.getElementById('predictor-date');
const predictButton = document.getElementById('predict-button');
const predictedYears = document.getElementById('predicted-years');
const predictedMonths = document.getElementById('predicted-months');
const predictedDays = document.getElementById('predicted-days');
const predictedDate = document.getElementById('predicted-date');


const timezones = [
    { value: 'UTC', label: 'UTC' },
    { value: 'GMT', label: 'GMT' },
    { value: 'CET', label: 'Central European Time' },
    { value: 'EST', label: 'Eastern Standard Time' },
    { value: 'PST', label: 'Pacific Standard Time' },
];

timezones.forEach(tz => {
    const option = document.createElement('option');
    option.value = tz.value;
    option.textContent = tz.label;
    timezoneSelect.appendChild(option);
});

// Add event listener to the calculate button
calculateButton.addEventListener('click', () => {
    const birthday = new Date(birthdayInput.value);
    const birthTime = birthTimeInput.value;
    const timezone = timezoneSelect.value;

    const age = calculateAge(birthday, birthTime, timezone);

    document.getElementById('years').textContent = age.years;
    document.getElementById('months').textContent = age.months;
    document.getElementById('days').textContent = age.days;
    document.getElementById('hours').textContent = age.hours;
    document.getElementById('minutes').textContent = age.minutes;
    document.getElementById('birth-date').textContent = birthday.toDateString();
    document.getElementById('next-birthday').textContent = calculateNextBirthday(birthday);
});


function calculateAge(birthday, birthTime, timezone) {
    const now = new Date();
    const birthDateTime = new Date(birthday);

    if (birthTime) {
        const [hours, minutes] = birthTime.split(':');
        birthDateTime.setHours(hours);
        birthDateTime.setMinutes(minutes);
    }


    const timezoneOffset = now.getTimezoneOffset() * 60000; // in milliseconds
    const localNow = new Date(now.getTime() + timezoneOffset);

    const totalMilliseconds = localNow - birthDateTime;
    const totalMinutes = Math.floor(totalMilliseconds / (1000 * 60));

    const years = localNow.getFullYear() - birthDateTime.getFullYear();
    const months = localNow.getMonth() - birthDateTime.getMonth();
    const days = localNow.getDate() - birthDateTime.getDate();

    const hours = localNow.getHours() - birthDateTime.getHours();
    const minutes = localNow.getMinutes() - birthDateTime.getMinutes();

    return {
        years: years - (months < 0 || (months === 0 && days < 0) ? 1 : 0),
        months: (months + (days < 0 ? 12 : 0)) % 12,
        days: (days + (days < 0 ? new Date(localNow.getFullYear(), localNow.getMonth(), 0).getDate() : 0)),
        hours: (hours < 0 ? 24 + hours : hours),
        minutes: (minutes < 0 ? 60 + minutes : minutes),
    };
}


function calculateNextBirthday(birthday) {
    const nextBirthday = new Date(birthday);
    nextBirthday.setFullYear(new Date().getFullYear());
    if (nextBirthday < new Date()) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    return nextBirthday.toDateString();
}


predictButton.addEventListener('click', () => {
    const predictorBirthday = new Date(predictorBirthdayInput.value);
    const predictorDate = new Date(predictorDateInput.value);

    const ageOnDate = calculateAgeOnDate(predictorBirthday, predictorDate);

    predictedYears.textContent = ageOnDate.years;
    predictedMonths.textContent = ageOnDate.months;
    predictedDays.textContent = ageOnDate.days;
    predictedDate.textContent = predictorDate.toDateString(); // Display the specific date
});

function calculateAgeOnDate(birthday, specificDate) {
    const totalDays = Math.floor((specificDate - birthday) / (1000 * 60 * 60 * 24));
    const years = specificDate.getFullYear() - birthday.getFullYear();
    const months = specificDate.getMonth() - birthday.getMonth();
    const days = specificDate.getDate() - birthday.getDate();

    return {
        years: years - (days < 0 ? 1 : 0),
        months: (months + (days < 0 ? 12 : 0)) % 12,
        days: (days + (days < 0 ? new Date(specificDate.getFullYear(), specificDate.getMonth(), 0).getDate() : 0)),
    };
}
