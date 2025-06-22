import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    mode: "onBlur",
  });

  const passwordValue = watch("password");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { confirmPassword, ...userData } = data;

    try {
      const response = await fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed.");
      }

      console.log("Server response:", result);
      toast.success("Registration successful!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    } catch (error) {
      toast.error("Registration failed. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <section className="register container register-container">
      <h1 className="register__heading">Register</h1>
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="register-form-box">
          <label htmlFor="username" className="register-form__label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="register-form__input input"
            placeholder="Enter your username"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters long",
              },
            })}
          />
          {errors.username && (
            <p className="register-form__error">{errors.username.message}</p>
          )}
        </div>

        <div className="register-form-box">
          <label htmlFor="email" className="register-form__label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="register-form__input input"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Entered value does not match email format",
              },
            })}
          />
          {errors.email && (
            <p className="register-form__error">{errors.email.message}</p>
          )}
        </div>

        <div className="register-form-box">
          <label htmlFor="password" className="register-form__label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="register-form__input input"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="register-form__error">{errors.password.message}</p>
          )}
        </div>

        <div className="register-form-box">
          <label htmlFor="confirmPassword" className="register-form__label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="register-form__input input"
            placeholder="Confirm your password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === passwordValue || "The passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="register-form__error">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <p className="register-form__text">
          Create your free account to rate, review, and discover movies. Join
          Cinebase and become part of a growing film community.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="register-form__btn btn btn--primary"
        >
          {isSubmitting ? "Registering..." : "Register Account"}
        </button>
      </form>
    </section>
  );
}
