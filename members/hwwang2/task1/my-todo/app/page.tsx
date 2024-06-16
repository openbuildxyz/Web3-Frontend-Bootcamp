'use client'
import Image from "next/image";
import TodoApp from "../components/todo/todo";
import Header from "../components/header";
// import TodoItem from "./todo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <Header />
      <TodoApp />
    </main>
  );
}
