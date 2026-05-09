// React
import { useState } from "react";

// Hooks
import useLogin from "@/features/auth/hooks/useLogin";

// UI
import { Input } from "@/shared/components/shadcn/input";
import { Button } from "@/shared/components/shadcn/button";
import { Label } from "@/shared/components/shadcn/label";

const LoginForm = () => {
  const { mutate, isPending } = useLogin();
  const [form, setForm] = useState({ login: "", password: "" });

  const handleChange = (key) => (e) =>
    setForm((s) => ({ ...s, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.login || !form.password) return;
    mutate(form);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="login">Login</Label>
        <Input
          id="login"
          name="login"
          autoFocus
          autoComplete="username"
          placeholder="Loginingizni kiriting"
          value={form.login}
          onChange={handleChange("login")}
          disabled={isPending}
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="password">Parol</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Parolingizni kiriting"
          value={form.password}
          onChange={handleChange("password")}
          disabled={isPending}
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Kirilmoqda..." : "Kirish"}
      </Button>
    </form>
  );
};

export default LoginForm;
