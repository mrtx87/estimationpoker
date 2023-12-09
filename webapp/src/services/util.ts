import moment from "moment/moment";

export function isDev(): boolean {
    return isLocalHost();
}

export function isLocalHost(): boolean {
    return window.location.href.includes('localhost:8080');
}

export class Logger {
    static log(...messages: any) {
        Logger.logGeneral(console.log, messages);
    }

    static warn(...messages: any) {
        Logger.logGeneral(console.warn, messages);
    }

    static error(...messages: any) {
        Logger.logGeneral(console.error, messages);
    }

    static logGeneral(logFunction: (...args: any) => void, messages: any) {
        if (isDev()) {
            logFunction(...messages);
        }
    }
}

export function isValidRoomId(roomId: string): boolean {
    return Boolean(roomId) && roomId.match(/^\w{8}-(\w{4}-){3}\w{12}$/i) !== null;
}

export function randomInt(num: number) {
    return Math.floor(Math.random() * num);
}

export function randomSelection(arr: any[]) {
    return arr[randomInt(arr.length)];
}

export function randomColor(colorOptions: string[]): string {
    return randomSelection(colorOptions);
}

export function getPieChartObj(title: { text: string, subtext: string },
                               series: {
                                   title: string,
                                   data: [{ value: number, name: string }],
                                   radius?: string | string[],
                                   color?: string[]
                               }) {
    return {
        title: {
            text: title.text,
            subtext: title.subtext,
            right: 'right',
            top: 'left'
        },
        tooltip: {
            trigger: 'item',
            height: '100px',
            responsive: true,
            position: 'top',
            backgroundColor: '#fafcfe',
            borderColor: '#c8e2f7',
            borderWidth: '0.8',
            textStyle: {
                color: '#5d6f80'
            }
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            formatter: function (name: string) {
                return `${name} ${series.data
                    .filter((a) => a.name === name)
                    .map((a) => `{count| - ${a.value} votes}`)}`;
            },

        },
        textStyle: {
            rich: {
                'count': {
                    align: 'right',
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: '13',
                }
            }
        },
        series: [
            {
                name: series.title,
                type: 'pie',
                center: ['50%', '40%'],
                radius: series.radius ? series.radius : '50%',
                color: series.color ? series.color : [
                    '#37A2DA',
                    '#32C5E9',
                    '#67E0E3',
                    '#9FE6B8',
                    '#FFDB5C',
                    '#ff9f7f',
                    '#fb7293',
                    '#E062AE',
                    '#E690D1',
                    '#e7bcf3',
                    '#9d96f5',
                    '#8378EA',
                    '#96BFFF'
                ],
                data: series.data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
}

export function mapValuesByAmount(valuesByAmount: any[]): { value: number; name: string }[] {
    return valuesByAmount.map(vba => {
        return {
            value: vba.amount,
            name: vba.voteValue.label
        }
    });
}

export function formatDate(date: Date) {
    return moment(date).format("DD.MM.YYYY");

}

export function sortUser(a: any, b: any) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

export function formatTime(time: number) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return formatNumberUnder10(hours) + ':' + formatNumberUnder10(minutes) + ':' + formatNumberUnder10(seconds)
}

function formatNumberUnder10(num: number) {
    return num < 10 ? '0' + num : num;
}
