import React from "react";
import * as calendar from "./Calendar";
import "./index.css";
import classnames from "classnames";

export default class Calendar extends React.Component {
  static defaultProps = {
    date: new Date(),
    years: ["2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029"],
    months: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    days: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    onchange: Function.prototype, //Функция которая ничего не делает (пустая функция)
  };

  state = {
    date: this.props.date,
    currentDate: new Date(),
    selectedDate: null,
  };

  // Гетеры:
  get year() {
    return this.state.date.getFullYear();
  }

  get month() {
    return this.state.date.getMonth();
  }

  get day() {
    return this.state.date.getDay();
  }

  // Методы обработок кнопок:

  //Нажатие на предыдущую кнопку
  handlePrevMonthButtonClick = () => {
    const date = new Date(this.year, this.month - 1);

    this.setState({ date });
  };

  //Нажатие на следующую кнопку
  handleNextMonthButtonClick = () => {
    const date = new Date(this.year, this.month + 1);

    this.setState({ date });
  };

  // Метод обработки календаря
  handleSelectChange = () => {
    const year = this.yearSelect.value;

    const month = this.monthSelect.value;

    const date = new Date(year, month);

    this.setState({ date });
  };

  // Обработчик, который будет срабатывать при нажатии на день календаря
  handleDayClick = (date) => {
    //принимаем объект Дата
    this.setState({ selectedDate: date }); //Устанвливаем состояние выбранной даты

    this.props.onChange(date); //Сообщаем родительскому компоненту о выбранной дате
  };

  render() {
    const { years, months, days } = this.props;
    const { currentDate, selectedDate } = this.state;

    const monthDate = calendar.getMonthData(this.year, this.month);

    return (
      <div className="calendar">
        <header>
          <button onClick={this.handlePrevMonthButtonClick}>{"<"}</button>

          <select
            ref={(element) => (this.monthSelect = element)}
            value={this.month}
            onChange={this.handleSelectChange}
          >
            {months.map((name, index) => (
              <option key={name} value={index}>
                {name}{" "}
              </option>
            ))}
          </select>

          <select
            ref={(element) => (this.yearSelect = element)}
            value={this.year}
            onChange={this.handleSelectChange}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <button onClick={this.handleNextMonthButtonClick}>{">"}</button>
        </header>

        <table>
          <thead>
            <tr>
              {days.map((name) => (
                <th key={name}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {monthDate.map((week, index) => (
              <tr key={index} className="week">
                {week.map((date, index) =>
                  date ? (
                    <td
                      key={index}
                      className={classnames("day", {
                        today: calendar.areEqual(date, currentDate),
                        selected: calendar.areEqual(date, selectedDate),
                      })}
                      onClick={() => this.handleDayClick(date)}
                    >
                      {date.getDate()}
                    </td>
                  ) : (
                    <td key={index} />
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
