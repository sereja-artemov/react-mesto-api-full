import React from "react";

function Form({
  onSubmit,
  isLoading,
  isLightTheme,
  id,
  key,
  title,
  textSubmitBtn = "Отправить",
  bottomText = "",
  formItems,
}) {
  return (
    <form
      onSubmit={onSubmit}
      id={`form-type-${id}`}
      action="POST"
      name={id}
      className="form"
    >
      <h2
        className={`form__title ${isLightTheme && "form__title_color_white"}`}
      >
        {title}
      </h2>

      {formItems}

      <input
        id={`form__btn_type-${id}`}
        className={`form__btn ${isLightTheme && "form__btn_color_white"} ${
          isLoading ? "form__btn_status_disabled" : ""
        }`}
        type="submit"
        value={`${isLoading ? "Происходит магия..." : textSubmitBtn}`}
      />
      <p className="form__bottom-text">{bottomText}</p>
    </form>
  );
}

export default Form;
