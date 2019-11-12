const dateTimeNow = () => new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''); // SO

module.exports = {
    dateTimeNow
};