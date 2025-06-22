import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import API_CONFIG from "../api/config";
import { showErrorToast, showSuccessToast } from "../components/ToastMessage";
import { useAuth } from "../contexts/AuthProvider";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    mode: "onBlur",
  });

  const { login } = useAuth();

  const handleLoginUser = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    try {
      const response = await fetch(API_CONFIG.endpoints.user.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const result = await response.json();
      login(result.user);
      reset();
      showSuccessToast("Login successful! Welcome back.");
      navigate("/");
    } catch (error) {
      reset();
      showErrorToast(
        (error as Error).message || "An error occurred during login."
      );
    }
  };
  return (
    <section className="register container register-container">
      <h1 className="register__heading">Log In</h1>
      <form className="register-form" onSubmit={handleSubmit(handleLoginUser)}>
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
          {typeof errors.email?.message === "string" && (
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
          {typeof errors.password?.message === "string" && (
            <p className="register-form__error">{errors.password.message}</p>
          )}
        </div>

        <p className="register-form__text">
          Log in to your Cinebase account to explore top-rated movies and share
          your thoughts.
        </p>
        <button type="submit" className="register-form__btn btn btn--primary">
          Log In
        </button>
      </form>
    </section>
  );
}
