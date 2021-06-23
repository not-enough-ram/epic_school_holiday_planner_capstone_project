import DropDownMenu from "./DropDownMenu";

export default function BookingForm({ holidays, startDate, endDate }) {
  return (
    <form>
      <p>Für welche Ferien: </p>
      <DropDownMenu holidays={holidays} />
      <p>
        Von: {startDate} bis: {endDate}
      </p>
      <div className="form-group">
        <label>Startdatum *</label>
        <input
          type="date"
          className="form-control form-control-sm"
          name="startDate"
          value=""
        />
      </div>
      <div className="form-group">
        <label>Enddatum *</label>
        <input
          type="date"
          className="form-control form-control-sm"
          name="endDate"
          value=""
        />
      </div>
      <div className="form-group">
        <label>Kind / Kinder auswählen</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="checkbox_name_1"
            value="Kind1Name"
          />
          <label className="form-check-label">Kind 1</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="checkbox_name_2"
            value="Kind2Name"
          />
          <label className="form-check-label">Kind 2</label>
        </div>
      </div>
      <div className="form-group">
        <input
          type="submit"
          className="btn btn-primary"
          name="button_name"
          value="Senden"
        />
      </div>
      <small>Felder markiert mit * sind Pflichtfelder.</small>
    </form>
  );
}
