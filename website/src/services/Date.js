class DateService {

    static formatDate(date) {

        const dateObject = new Date (date);
        const day= dateObject.getUTCDate();
        const month= dateObject.getUTCMonth()+1;
        const year= dateObject.getUTCFullYear();
        return day + " - " + month + " - " + year ;

    }
}

export default DateService;