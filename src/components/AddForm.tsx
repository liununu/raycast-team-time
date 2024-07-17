import { Action, ActionPanel, Form } from "@raycast/api";
import { useState } from "react";

export default (props: { onSubmit: (value: { code: string, label: string }) => void }) => {
  const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const defaultLabel = currentTimeZone.split("/").at(-1) ?? "";
  const [code, setCode] = useState<string>(currentTimeZone);
  const [label, setLabel] = useState<string>(defaultLabel);

  return (
    <Form
      navigationTitle={"Add Team Time"}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={props.onSubmit} />
        </ActionPanel>
      }
    >
      <Form.Dropdown id="code" title="Time Zone" value={code} onChange={setCode}>
        {Intl.supportedValuesOf("timeZone")
          .map(t => <Form.Dropdown.Item key={t} value={t} title={t} />)}
      </Form.Dropdown>
      <Form.TextField id="label" title="Label" placeholder="Give the label for this time zone" value={label}
                      onChange={setLabel}
      />
    </Form>
  );
}
