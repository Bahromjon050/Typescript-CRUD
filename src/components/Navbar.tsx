import React, { FC, HTMLInputTypeAttribute, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { userAdd, userDelete, userEdit } from "../redux/Userreducers";
import Swal from "sweetalert2";

export interface userDateType {
  id: number;
  userName: String;
  email: String;
  password: number;
}

const Crud: FC = () => {
  const { userData } = useSelector((state: any) => state.userSlice);
  const dispatch = useDispatch();
  const schema = yup
    .object({
      userName: yup.string().required("Please enter your user name"),
      email: yup.string().email().required("Please enter your email"),
      password: yup.string().required("Please enter your password"),
    })
    .required();
  const {
    setValue,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<userDateType>({
    resolver: yupResolver(schema),
  });
  type codeping = {
    icon: String;
    type: String;
  };
  const [result, setResult] = useState<Boolean>(true);
  const [code, setCode] = useState<codeping>({
    icon: "./img/ochiq.svg",
    type: "password",
  });
  const [replay, setReplay] = useState<Boolean>(false);
  const onSubmit = (data: userDateType) => {
    if (result) dispatch(userAdd({ ...data, id: new Date().getTime() }));
    else {
      dispatch(userEdit(data));
      setResult(true);
    }
    reset();
  };

  const editFun = (obj: userDateType) => {
    setResult(false);
    setValue("id", obj.id);
    setValue("userName", obj.userName);
    setValue("email", obj.email);
    setValue("password", obj.password);
  };

  const deleteFun = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result: any) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "User deleted.", "success");
        dispatch(userDelete(id));
      }
    });
  };

  const codeFun = () => {
    if (replay) {
      setCode({ ...code, icon: "./img/yopiq.svg", type: "text" });
      setReplay(false);
    } else {
      setCode({ ...code, icon: "./img/ochiq.svg", type: "password" });
      setReplay(true);
    }
  };
  const border = {
    border: "1px solid crimson",
  };
  return (
    <>
      <form
        className="sign-in-form"
        style={{ marginTop: "50px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="title">CRUD users</h2>
        <div
          className="input-field"
          style={errors.userName ? border : Object.create(String)}
        >
          <label htmlFor="users">
            <img src="./img/user.svg" className="icon_input" alt="" />
          </label>
          <input
            type="text"
            placeholder="User name"
            id="users"
            {...register("userName", {
              required: "Please enter your user name",
            })}
          />
        </div>
        <p style={{ color: "crimson" }}>{errors.userName?.message}</p>
        <div
          className="input-field"
          style={errors.email ? border : Object.create(String)}
        >
          <label htmlFor="emails">
            <img src="./img/email.svg" className="icon_input" alt="" />
          </label>
          <input
            type="email"
            placeholder="Email"
            id="emails"
            {...register("email", {
              required: "Please enter your email",
            })}
          />
        </div>
        <p style={{ color: "crimson" }}>{errors.email?.message}</p>
        <div
          className="input-field"
          style={errors.password ? border : Object.create(String)}
        >
          <label htmlFor="passwords">
            <img
              src={code.icon as HTMLInputTypeAttribute}
              onMouseUp={codeFun}
              className="icon_input"
              alt=""
            />
          </label>
          <input
            type={code.type as HTMLInputTypeAttribute}
            placeholder="Password"
            id="passwords"
            {...register("password", {
              required: "Please enter your password",
            })}
          />
        </div>
        <p style={{ color: "crimson" }}>{errors.password?.message}</p>
        <input
          type="submit"
          value={result ? "Add user" : "Edit user"}
          className="btn solid"
        />
      </form>
      <div className="table-container">
        <h1 style={{ textAlign: "center", marginTop: "40px" }}>Table users</h1>
        <table>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>#</th>
              <th>UserName</th>
              <th>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData ? (
              userData.map((val: userDateType, i: number) => (
                <tr key={i}>
                  <td style={{ textAlign: "center" }}>{i + 1}</td>
                  <td>{val.userName}</td>
                  <td>{val.email}</td>
                  <td>{String(val.password)}</td>
                  <td style={{ width: "350px", textAlign: "center" }}>
                    <button
                      className="btn btn_action"
                      onClick={() => editFun(val)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn_action"
                      onClick={() => deleteFun(val.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <div className="found-container">
                <h2 className="found">There is no information</h2>
              </div>
            )}
            {userData.length === 0 ? (
              <div className="found-container">
                <h2 className="found">There is no information</h2>
              </div>
            ) : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Crud;
