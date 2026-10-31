/**
 * Sanity schema — leads only (Avishi manages Studio).
 * Import into a Sanity project when connecting the dataset.
 */
export const leadSchema = {
  name: "lead",
  title: "Lead",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (r: { required: () => unknown }) => r.required() },
    { name: "phone", title: "Phone", type: "string", validation: (r: { required: () => unknown }) => r.required() },
    { name: "email", title: "Email", type: "string" },
    {
      name: "interest",
      title: "Interest",
      type: "string",
      options: {
        list: [
          { title: "Tefillin", value: "tefillin" },
          { title: "Mezuzot", value: "mezuzot" },
          { title: "Megillot", value: "megillot" },
          { title: "Sefer Torah", value: "sefer-torah" },
          { title: "Pitum", value: "pitum" },
          { title: "General", value: "general" },
        ],
      },
    },
    {
      name: "secondaryInterest",
      title: "Secondary interest (optional)",
      type: "string",
      options: {
        list: [
          { title: "Tefillin", value: "tefillin" },
          { title: "Mezuzot", value: "mezuzot" },
          { title: "Megillot", value: "megillot" },
          { title: "Sefer Torah", value: "sefer-torah" },
          { title: "Pitum", value: "pitum" },
          { title: "General", value: "general" },
        ],
      },
    },
    {
      name: "source",
      title: "Source",
      type: "string",
      options: { list: ["form", "whatsapp-click"] },
    },
    {
      name: "locale",
      title: "Locale",
      type: "string",
      options: { list: ["he", "en"] },
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Called", value: "called" },
          { title: "Meeting", value: "meeting" },
          { title: "Won", value: "won" },
          { title: "Lost", value: "lost" },
        ],
      },
      initialValue: "new",
    },
    { name: "notes", title: "Notes", type: "text" },
    { name: "createdAt", title: "Created", type: "datetime" },
    { name: "turnstilePassed", title: "Turnstile OK", type: "boolean" },
    { name: "userAgent", title: "User Agent", type: "string" },
    { name: "ipHash", title: "IP Hash", type: "string" },
  ],
  preview: {
    select: { title: "name", subtitle: "phone" },
  },
};
