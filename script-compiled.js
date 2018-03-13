class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.running = false;
        this.state = {
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            marks: []
        };
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    format() {
        return `${pad0(this.state.times.minutes)}:${pad0(this.state.times.seconds)}:${pad0(Math.floor(this.state.times.miliseconds))} `;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
    }

    calculate() {
        this.setState(previousState => {
            previousState.times.miliseconds += 1;
            if (previousState.times.miliseconds >= 100) {
                previousState.times.seconds += 1;
                previousState.times.miliseconds = 0;
            }
            if (previousState.times.seconds >= 60) {
                previousState.times.minutes += 1;
                previousState.times.seconds = 0;
            }

            return previousState;
        });
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    clear() {
        this.reset();
    }

    mark() {
        const newArr = this.state.marks.slice();
        newArr.push(this.format());

        this.setState({
            marks: newArr
        });
    }

    clearMarkers() {
        this.setState({
            marks: []
        });
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "nav",
                { className: "controls" },
                React.createElement(
                    "a",
                    { href: "#", className: "button start", onClick: this.start.bind(this) },
                    "Start"
                ),
                React.createElement(
                    "a",
                    { href: "#", className: "button stop", onClick: this.stop.bind(this) },
                    "Stop"
                ),
                React.createElement(
                    "a",
                    { href: "#", className: "button clear", onClick: this.clear.bind(this) },
                    "Clear"
                )
            ),
            React.createElement(
                "div",
                { className: "stopwatch" },
                this.format()
            ),
            React.createElement(
                "div",
                { className: "controls_mark" },
                React.createElement(
                    "a",
                    { href: "#", className: "button_mark", onClick: this.mark.bind(this) },
                    "Mark"
                ),
                React.createElement(
                    "a",
                    { href: "#", className: "button_clear", onClick: this.clearMarkers.bind(this) },
                    "Clear marks"
                )
            ),
            React.createElement(
                "div",
                { className: "markers" },
                "Markers:"
            ),
            React.createElement(
                "ul",
                { className: "results" },
                this.state.marks.map(mark => React.createElement(
                    "li",
                    null,
                    mark
                ))
            )
        );
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = `0${result}`;
    }
    return result;
}

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('app'));
