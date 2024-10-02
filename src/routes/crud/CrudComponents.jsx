import React from "react";

const buttonsClasses = "mx-2 text-slate-500 hover:text-sky-600";

export function EditButtons({ editing, setEditing, editAction, deleteAction }) {
  return (
    <div>
      {editing ? (
        <i
          onClick={() => editAction()}
          type="submit"
          className="fa-solid fa-check mx-2 text-sky-600 hover:text-sky-400"
        />
      ) : (
        <i
          onClick={() => setEditing(true)}
          className="fa-solid fa-pencil mx-2 text-slate-500 hover:text-sky-600"
        />
      )}
      <i
        onClick={deleteAction}
        className={`fa-solid fa-trash ${buttonsClasses}`}
      />
    </div>
  );
}

export default {};
