// app/index.tsx
import { Redirect } from "expo-router";

export default function Index() {
  // redirect root "/" to "/home"
  return <Redirect href="/home" />;
}
