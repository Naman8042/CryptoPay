// lib/contract.ts
import contractABI from "./PaymentGatewayABI.json";

import type { Abi ,Address } from "viem";


export const CONTRACT_ADDRESS:Address = "0x9915dc69138fb0a441559722762fc7eb248198d8"; 
export const CONTRACT_ABI: Abi = contractABI as Abi;
