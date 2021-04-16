function checkForName() {
    const travel_place = document.getElementById('travel_place').value;
    let date = document.getElementById('travel_date').value;
    //checking the form
    if (travel_place === '' || date === '') {
        console.log('No place or No date');
        return 'empty';
    }
}
export {checkForName}