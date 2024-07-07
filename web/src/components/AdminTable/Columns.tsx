"use client";

import { ColumnDef } from '@tanstack/react-table';
import DeleteDialog from '../DeleteDialog';
import EditDialog from '../EditDialog';



export type Admin = {
  id: string;
  firstname: string;
  lastname: string;
  username: string | null;
  email: string;
  password: string;
  resetPasswordToken: string | null;
  registrationToken: string | null;
  isActive: boolean;
  blocked: boolean;
  preferedLanguage: string | null;
  createdAt: string;
  updatedAt: string;
};
export const adminColumns: ColumnDef<Admin>[] = [
  {
    accessorKey: "firstname",
    header: "First Name",
  },
  {
    accessorKey: "lastname",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ getValue }) => (getValue() ? "✅" : "❌"),
  },
  {
    accessorKey: "blocked",
    header: "Blocked",
    cell: ({ getValue }) => (getValue() ? "✅" : "❌"),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <EditDialog admin={ row.original } onSave={ (updatedAdmin) => handleEdit(updatedAdmin) } />
        <DeleteDialog adminId={ row.original.id } onDelete={ (id) => handleDelete(id) } />
      </div>
    ),
  },
];

const handleEdit = (updatedAdmin: Admin) => {
  // Handle edit logic here
  console.log("Edit admin", updatedAdmin);
};

const handleDelete = (id: string) => {
  // Handle delete logic here
  console.log("Delete admin with id", id);
};