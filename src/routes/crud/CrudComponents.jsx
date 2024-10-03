import React from "react";

const buttonsClasses = "mx-2 text-slate-500 hover:text-sky-600";

export function EditButtons({ editing, setEditing, deleteAction }) {
  return (
    <div>
      {editing ? (
        <div>
          <button
            type="submit"
            className="fa-solid fa-check mx-2 text-sky-600 hover:text-sky-400"
          />
          <i
            onClick={() => setEditing(false)}
            type="submit"
            className="fa-solid fa-circle-xmark mx-2 text-slate-500 hover:text-sky-400"
          />
        </div>
      ) : (
        <div>
          <i
            onClick={() => setEditing(true)}
            className="fa-solid fa-pencil mx-2 text-slate-500 hover:text-sky-600"
          />
          <i
            onClick={() => deleteAction()}
            className={`fa-solid fa-trash ${buttonsClasses}`}
          />
        </div>
      )}
    </div>
  );
}

export default {};
