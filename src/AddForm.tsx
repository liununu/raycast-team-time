import { Action, ActionPanel, Form } from "@raycast/api";
import { useState } from "react";

export default () => {
  const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [code, setCode] = useState<string>(currentTimeZone);
  const [label, setLabel] = useState<string | undefined>(undefined);

  return (
    <Form
      navigationTitle={"Add Team Time"}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.Dropdown id="code-dropdown" title="Time Zone" value={code} onChange={setCode}>
        {Intl.supportedValuesOf("timeZone")
          .map(t => <Form.Dropdown.Item key={t} value={t} title={t} />)}
      </Form.Dropdown>
      <Form.TextField id="label-field" title="Label" placeholder="Give the label for this time zone" value={label}
                      onChange={setLabel}
      />
    </Form>
  );
}
