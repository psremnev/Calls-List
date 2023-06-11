import { ReactNode } from "react";

type IValue = string | number

interface IProperties {
  idProperty?: string
  displayProperty?: string
}

export interface IFilter extends IProperties {
  name: string
  idProperty?: string
  displayProperty?: string
  value: IValue
  textValue: string
  defaultValue: IValue
  items: object[]
  itemTemplate?: ReactNode
  filterChanged?: (result: { name: string, value: IValue, textValue: string }) => void
  showSelectedMarker?: boolean
}

export interface IFilterItem extends IProperties {
  name: string
  item: object
  selected: boolean
  showSelectedMarker: boolean
  clickCallback?: Function
  itemTemplate?: ReactNode
}