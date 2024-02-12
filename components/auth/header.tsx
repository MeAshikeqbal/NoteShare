interface HeaderProps {
  lable: string;
}

export const Header = ({ lable }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-y-4">
      <h1 className="text-3xl font-bold ">Note Share</h1>
      <p className=" text-muted-foreground text-sm">{lable}</p>
    </div>
  );
};
