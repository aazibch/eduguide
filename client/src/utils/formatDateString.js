export default (dateString) => {
    return new Date(dateString).toLocaleString('en-us', {
        day: '2-digit',
        weekday: 'short',
        month: 'long',
        year: 'numeric'
    });
};

// Reformat this file according to the structure of the burger-builder project in the lectures.
