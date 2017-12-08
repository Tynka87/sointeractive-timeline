const presentDay = new Date("2015-06-10");
const startDay = new Date("2015-06-01");
const endDay = new Date("2015-06-30");

const unit = 100 / axleLength();

const events = [["2015-06-02", "Lorem ipsum dolor sit amet", "fa-heart"],
                ["2015-06-11", "Lorem ipsum dolor sit amet", "fa-flask"],
                ["2015-06-15", "Lorem ipsum dolor sit amet", "fa-gavel"],
                ["2015-06-22", "Lorem ipsum dolor sit amet", "fa-graduation-cap"],
                ["2015-06-30", "Lorem ipsum dolor sit amet", "fa-trophy"]];



$(function () {
    $('head').append("<style>.axis::after{ width:" + Math.floor(getDayNumber(presentDay) * unit) + "% }</style>");
    renderEvents(events);
});

function renderEvents(events) {
    let template = $('#template').html();
    Mustache.parse(template);

    events
        .filter((event) => isInRange(event[0]))
        .forEach((event) => {
            let rendered = Mustache.render(template, {
                icon: event[2],
                tooltipDate: formateDate(event[0]),
                tooltipText: event[1]
            });

            let point = $(rendered);

            let eventDate = getDayNumber(new Date(event[0]));          
            let position = calculatePosition(eventDate);
            point.css({
                'left': position + "%"
            });

            if (eventDate <= getDayNumber(presentDay)) {
                point.children('.point').addClass('done');
            }

            $('.events ul').append(point);
        })
}

function getDayNumber(date) {
    return (date.getTime() - startDay.getTime()) / (1000 * 60 * 60 * 24)+1;
}

function calculatePosition(dl) {
    if (dl === 1) {
        return 0;
    } else {
        return (dl * unit);
    }
}

function formateDate(dateString) {
    let date = new Date(dateString);
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return dd + '.' + mm + '.' + yyyy;
}

function axleLength() {
    let axleLength = endDay.getTime() - startDay.getTime();
    return axleLength / (1000 * 60 * 60 * 24) + 1;
}

function isInRange(dateString) {
    let date = new Date(dateString);
    return date.getTime() >= startDay.getTime() && date.getTime() <= endDay.getTime();
}
