import { FirebaseData } from "@/app/page";
import { Edit, MoreHorizontalFill, TrashCan } from "akar-icons";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"div">{
  data: FirebaseData[];
  onSetById: (idCtt: string) => void;
  onEdit: (infoCtt: FirebaseData) => void;
  onDelete: (idCtt: string) => void;
}

export function ContactTable({ data, onSetById, onEdit, onDelete, ...rest }: Props) {
  return (
    <div {...rest} >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telephone</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((ctt) => (
            <TableRow key={ctt[0]}>
              <TableCell>{ctt[1].name}</TableCell>
              <TableCell>{ctt[1].email}</TableCell>
              <TableCell>{ctt[1].telephone}</TableCell>
              <TableCell className="flex justify-center">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontalFill size={18} />
                  </PopoverTrigger>
                  <PopoverContent className="w-36">
                    <div
                      className="flex gap-2 mb-2 items-center text-sm cursor-pointer"
                      onClick={() => {
                        onEdit(ctt);
                        onSetById(ctt[0]);
                      }}
                    >
                      <Edit size={18} />
                      <p>Edit</p>
                    </div>
                    <hr />
                    <div
                      className="flex gap-2 mt-2 items-center text-sm cursor-pointer"
                      onClick={() => onDelete(ctt[0])}
                    >
                      <TrashCan size={18} />
                      <p>Delete</p>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
