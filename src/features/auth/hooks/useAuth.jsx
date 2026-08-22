import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginAction } from "../state/LoginAction";

export const useAuth = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const getPasswordStrength = (value) => {
    if (!value) {
      return {
        score: 0,
        label: "",
      };
    }

    let score = 0;

    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (score <= 1) {
      return {
        score,
        label: "Weak password",
      };
    }

    if (score === 2) {
      return {
        score,
        label: "Medium password",
      };
    }

    return {
      score,
      label: "Strong password",
    };
  };



  const onLogin = async (data) => {
    dispatch(loginAction(data));
  };

  const onRegister = async (data) =>{
    console.log(data)
  }

  

  return {
    navigate,
    showPassword,
    setShowPassword,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onLogin,
    watch,
    getPasswordStrength,
    onRegister
  };
};
