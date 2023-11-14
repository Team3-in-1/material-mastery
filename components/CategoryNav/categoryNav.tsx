"use client";
import React, { useState } from "react";
import { NavLink, Stack } from "@mantine/core";
import classes from "./categoryNav.module.css"
import { Category } from "@/utils/response";
import { useSearchParams, useRouter } from 'next/navigation'

export const CategoryNav = ({ data }: CategoryNavProps) => {

  const searchParams = useSearchParams()

  const router = useRouter()

  const [active, setActive] = useState(searchParams.get('category') || data[0]._id)

  const handleOnclick = (id: string): void => {
    setActive(id)
    router.push(`/products?category=${id}`)
  }

  return (
    <Stack className={`hidden-mobile ${classes.container} rounded-lg`} px={15} py={20}>
      {data?.map(item => (
        <NavLink
          className={active == item._id ? 'text-center rounded-lg text-[0.9rem] text-[#02B1AB]' 
          : 'text-center rounded-md text-sm text-[#8E8E8E]'}
          key={item._id}
          active={item._id == active}
          label={item.category_name}
          onClick={() => handleOnclick(item._id)}
        />
      ))}
    </Stack>
  )
}

interface CategoryNavProps {
  data: Category[]
}
