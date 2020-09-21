export class Calendar {
  constructor(parent, schedule) {
    this.now = new Date();
    this.day = this.now.getDate();
    this.month = this.now.getMonth();
    this.year = this.now.getFullYear();

    this.parent = parent;
    this.calendarWrapper = null;
    this.calendarHeader = null;
    this.calendarTable = null;
    this.schedule = schedule;
    console.log(this.schedule);
  }

  createButtons() {
    this.buttonPrev.innerHTML = "<";
    this.buttonPrev.addEventListener("click", () => {
      this.month--;
      if (this.month < 0) {
        this.month = 11;
        this.year--;
      }
      while (this.tableInner.firstChild)
        this.tableInner.removeChild(this.tableInner.lastChild);
      this.filterMonth();
      this.createCalendarTable();
      this.displayDate();
    });

    this.buttonNext.innerHTML = ">";
    this.buttonNext.addEventListener("click", () => {
      this.month++;
      if (this.month > 11) {
        this.month = 0;
        this.year++;
      }
      while (this.tableInner.firstChild)
        this.tableInner.removeChild(this.tableInner.lastChild);
      this.filterMonth();
      this.createCalendarTable();
      this.displayDate();
    });
  }

  filterMonth() {
    this.activeMonthDates = [];
    this.activeMonthRecipes = [];

    this.schedule.forEach((recipe) => {
      if (recipe.date.getMonth() === this.month) {
        this.activeMonthDates.push(recipe.date.getDate());
        this.activeMonthRecipes.push(recipe);
      }
    });
  }

  createCalendarTable() {
    this.tableInner = document.createElement("div");
    this.tableInner.classList.add("calendar-table-inner");

    this.calendarTable.appendChild(this.tableInner);

    // Get number of days in month
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    const tempDate = new Date(this.year, this.month, 1);
    let firstMonthDay = tempDate.getDay();

    if (firstMonthDay === 0) {
      firstMonthDay = 7;
    }

    // Append empty cells
    for (let i = 0; i < firstMonthDay - 1; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.classList.add("calendar-table-inner_cell", "empty-cell");
      this.tableInner.appendChild(emptyCell);
    }

    // Append days cells
    for (let i = 0; i < daysInMonth; i++) {
      const dayCell = document.createElement("div");
      dayCell.classList.add("calendar-table-inner_cell", "active-cell");
      dayCell.innerHTML = i + 1;

      this.activeMonthDates.forEach((day) => {
        if (i + 1 === day) dayCell.classList.add("recipe-active");
      });

      dayCell.addEventListener("click", () => {
        if (dayCell.classList.contains("recipe-active")) {
          let activeRecipes = {
            dates: [],
          };

          this.activeMonthRecipes.forEach((recipe) => {
            if (recipe.date.getDate() === i + 1)
              activeRecipes.dates.push({
                recipe: recipe.recipe,
                dateId: recipe._id,
              });
          });

          const event = new CustomEvent("date-selected", {
            bubbles: true,
            detail: {
              year: this.year,
              month: this.month,
              day: dayCell.innerHTML,
              dates: activeRecipes.dates,
            },
          });
          this.parent.dispatchEvent(event);
        } else {
          const event = new CustomEvent("date-selected", {
            bubbles: true,
            detail: {
              year: this.year,
              month: this.month,
              day: dayCell.innerHTML,
            },
          });
          this.parent.dispatchEvent(event);
        }
      });

      this.tableInner.appendChild(dayCell);
    }
  }

  displayDate() {
    const monthNames = [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Swierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ];
    this.dateText.innerHTML = `${this.year} ${monthNames[this.month]}`;
  }

  initUI() {
    this.calendarHeader = document.createElement("div");

    this.calendarHeader.classList.add("calendar-header");

    this.calendarTable = document.createElement("div");
    this.calendarTable.classList.add("calendar-table");

    // Create days table and fill it with names of days of the week
    this.daysTable = document.createElement("div");
    this.daysTable.classList.add("calendar-days");
    const days = ["Pon", "Wto", "Śro", "Czw", "Pią", "Sob", "Nie"];
    days.forEach((day) => {
      const divDay = document.createElement("div");
      divDay.classList.add("calendar-days_day");
      divDay.innerHTML = day;
      this.daysTable.appendChild(divDay);
    });

    this.calendarTable.appendChild(this.daysTable);

    this.buttonPrev = document.createElement("div");
    this.buttonPrev.classList.add("calendar-button", "calendar-prev");

    this.buttonNext = document.createElement("div");
    this.buttonNext.classList.add("calendar-button", "calendar-next");

    this.dateText = document.createElement("div");
    this.dateText.classList.add("calendar-date-text");

    this.calendarHeader.appendChild(this.buttonPrev);
    this.calendarHeader.appendChild(this.dateText);
    this.calendarHeader.appendChild(this.buttonNext);

    this.parent.appendChild(this.calendarHeader);
    this.parent.appendChild(this.calendarTable);
  }

  init() {
    this.initUI();
    this.createButtons();
    this.filterMonth();
    this.createCalendarTable();
    this.displayDate();
  }
}
