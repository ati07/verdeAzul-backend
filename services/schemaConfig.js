export const schemaConfig = {
  collections: {
    clients: ["name", "email", "company", "phoneNumber"],
    projects: ["name"],
    banks: ["name"],
    providers: ["name", "serviceType", "projectId"],
    inventories: ["unitName", "projectId", "priceUnit", "rooms"],
    collectionReports: ["projectId", "clientId", "totalCollection", "typeOfPayment", "collectionReportDate"],
    paymentReports: ["projectId", "total", "date", "providerId", "projectCategoryId", "codeId"],
  },

  relations: {
    collectionReports: {
      clientId: "clients",
      projectId: "projects",
      bankId: "banks",
    },
    paymentReports: {
      providerId: "providers",
      projectId: "projects"
    },
    inventories: {
      clientId: "clients",
      projectId: "projects"
    }
  }
};
