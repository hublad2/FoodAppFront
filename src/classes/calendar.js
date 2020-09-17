class Calendar {
  constructor(input) {
    this.now = new Date();
    this.day = this.now.getDate();
    this.month = this.now.getMonth();
    this.year = this.now.getFullYear();

    this.input = input;
    this.calendarWrapper = null;
    this.calendarHeader = null;
    this.calendarTable = null;
  }

  initUI() {
    this.calendarWrapper = document.createElement("div");
    this.calendarWrapper.classList.add("calendar");

    this.calendarHeader = document.createElement("div");
    this.calendarHeader.classList.add("calendar-header");

    this.calendarTable = document.createElement("div");
    this.calendarTable.classList.add("calendar-table");

    this.buttons = document.createElement("div");
    this.buttons.classList.add("calendar-prev-next");

    this.dateText = document.createElement("div");
    this.dateText.classList.add("calendar-date-text");

    this.calendarHeader.appendChild(this.buttons);
    this.calendarHeader.appendChild(this.dateText);
    this.calendarWrapper.appendChild(this.calendarTable);
    this.calendarWrapper.appendChild(this.calendarHeader);
  }
}
