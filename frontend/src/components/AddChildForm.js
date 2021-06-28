import { Field, FieldArray, Form, Formik } from "formik";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function AddChildForm() {
  const { token } = useContext(AuthContext);
  return (
    <div>
      <h1>Kinder</h1>
      <Formik
        initialValues={{ children: [] }}
        onSubmit={(values) =>
          setTimeout(() => {
            axios.put("api/test/children", values, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            alert(JSON.stringify(values, null, 2));
          }, 500)
        }
        render={({ values }) => (
          <Form>
            <FieldArray
              name="children"
              render={(arrayHelpers) => (
                <div>
                  {values.children && values.children.length > 0 ? (
                    values.children.map((child, index) => (
                      <div key={index}>
                        <Field name={`children.${index}`} />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => arrayHelpers.insert(index, "")}
                        >
                          +
                        </button>
                      </div>
                    ))
                  ) : (
                    <button type="button" onClick={() => arrayHelpers.push("")}>
                      Kind hinzufügen
                    </button>
                  )}
                  <div>
                    <button type="submit">Submit</button>
                  </div>
                </div>
              )}
            />
          </Form>
        )}
      />
    </div>
  );
}
