import type { OtsDataset } from "./otsCatalogueClient";

type DataModality = OtsDataset["modality"];

const coverageOverrides: Record<string, string> = {
  eurosat: "13 spectral bands in the multispectral release",
  kmnist: "28 × 28 grayscale characters",
};

// Keep the private catalogue IDs on the server and send only neutral IDs and
// approved presentation fields to the /data page's interactive catalogue.
export function toDataPageCatalogue(records: OtsDataset[]): OtsDataset[] {
  const modalityOrdinals: Partial<Record<DataModality, number>> = {};
  return records.map((record) => {
    const ordinal = (modalityOrdinals[record.modality] ?? 0) + 1;
    modalityOrdinals[record.modality] = ordinal;
    return {
      ...record,
      id: `${record.modality}-${String(ordinal).padStart(2, "0")}`,
      coverage: coverageOverrides[record.id] ?? record.coverage,
    };
  });
}
