function NotFoundPage() {
  return (
    <div>
      <div className={"flex justify-center items-center h-screen"}>
        <div className={"text-3xl"}>
          <div className={"text-3xl text-center text-destructive"}>404</div>
          <div className={"text-xl"}>
            {"The page you are looking for does not exist."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
