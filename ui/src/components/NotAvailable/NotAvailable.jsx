import t from "./text";

const NotAvailable = () => {
  return (
    <h1 className="mt-96 px-20 text-center text-xl font-bold">{t.message()}</h1>
  );
};

export default NotAvailable;
