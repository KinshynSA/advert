export function formatDate(date){
    if(!date) return {};
    let d = new Date(+`${date.seconds}${('' + date.seconds).slice(0,3)}`);

    function f(d){
        if(d < 10) d = `0${d}`
        return d;
    }

    return {
        date: `${d.getFullYear()}-${f(d.getMonth())}-${f(d.getDate())}`,
        time: `${f(d.getHours())}:${f(d.getMinutes())}`
    };
}