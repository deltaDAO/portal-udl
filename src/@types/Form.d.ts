import { AssetSelectionAsset } from '../../molecules/FormFields/AssetSelection'

export interface FormFieldProps {
  label: string
  name: string
  type?: string
  options?: string[] | AssetSelectionAsset[]
  sortOptions?: boolean
  required?: boolean
  multiple?: boolean
  disabled?: boolean
  help?: string
  placeholder?: string
  pattern?: string
  min?: string
  disclaimer?: string
  disclaimerValues?: string[]
  advanced?: boolean
  disclaimer?: string
  disclaimerValues?: string[]
}

export interface FormContent {
  title: string
  description?: string
  success: string
  data: FormFieldProps[]
  walletDisclaimer: string
}
