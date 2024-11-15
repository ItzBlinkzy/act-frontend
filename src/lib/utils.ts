import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function mapUserIDType(userIdType: number) {
	if (userIdType === 1) {
		return "Fund Administrator"
	} else if (userIdType === 2) {
		return "Fund Manager"
	} else return null
}
