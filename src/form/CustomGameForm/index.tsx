import { memo, type ChangeEvent, type ChangeEventHandler } from "react";
import { useForm } from "@mantine/form";

import { Button } from "@/ui/Button";

import { convertObjectValues } from "@/utils/form/convertObjectValues";
import { getTransformedValues } from "@/utils/form/getTransformedValues";

import { FormCheckboxContainer } from "../FormCheckboxContainer";
import { FormContainer } from "../FormContainer";
import { FormIncludeExcludeCheckbox } from "../FormIncludeExcludeCheckbox";
import { FormInput } from "../FormInput";
import { FormToggle } from "../FormToggle";

const initialFormValues = {
  limit: 1,
  score: "",
  censored: true,
  kind: {
    tv: {
      label: "TV Сериал",
      checked: false,
      excluded: false,
    },
    tv_13: {
      label: "TV Сериал (Короткие)",
      checked: false,
      excluded: false,
    },
    tv_24: {
      label: "TV Сериал (Средние)",
      checked: false,
      excluded: false,
    },
    tv_48: {
      label: "TV Сериал (Длинные)",
      checked: false,
      excluded: false,
    },
    movie: {
      label: "Фильм",
      checked: false,
      excluded: false,
    },
    ova: {
      label: "ONA",
      checked: false,
      excluded: false,
    },
    ona: {
      label: "OVA",
      checked: false,
      excluded: false,
    },
    special: {
      label: "Спешл",
      checked: false,
      excluded: false,
    },
    music: {
      label: "Клип",
      checked: false,
      excluded: false,
    },
  },
  status: {
    anons: {
      label: "Анонисировано",
      checked: false,
      excluded: false,
    },
    ongoing: {
      label: "Сейчас выходит",
      checked: false,
      excluded: false,
    },
    released: {
      label: "Вышедшее",
      checked: false,
      excluded: false,
    },
  },
  duration: {
    S: {
      label: "До 10 минут",
      checked: false,
      excluded: false,
    },
    D: {
      label: "До 30 минут",
      checked: false,
      excluded: false,
    },
    F: {
      label: "Более 30 минут",
      checked: false,
      excluded: false,
    },
  },
  rating: {
    none: {
      label: "Без рейтинга",
      checked: false,
      excluded: false,
    },
    g: {
      label: "G",
      checked: false,
      excluded: false,
    },
    pg: {
      label: "PG",
      checked: false,
      excluded: false,
    },
    pg_13: {
      label: "PG-13",
      checked: false,
      excluded: false,
    },
    r: {
      label: "R",
      checked: false,
      excluded: false,
    },
    r_plus: {
      label: "R+",
      checked: false,
      excluded: false,
    },
    rx: {
      label: "Rx",
      checked: false,
      excluded: false,
    },
  },
};

export const CustomGameForm = memo(function CustomGameForm() {
  const form = useForm({
    initialValues: initialFormValues,

    transformValues: (values) => {
      const limit = Number(values.limit);
      const score = values.score === "" ? null : Number(values.score);
      const kind = convertObjectValues(values.kind);
      const status = convertObjectValues(values.status);
      const duration = convertObjectValues(values.duration);
      const rating = convertObjectValues(values.rating);

      return {
        limit,
        score,
        censored: values.censored,
        kind: getTransformedValues(kind),
        status: getTransformedValues(status),
        duration: getTransformedValues(duration),
        rating: getTransformedValues(rating),
      };
    },
  });

  return (
    <FormContainer
      onSubmit={(event) => {
        event.preventDefault();
        console.log(form.getTransformedValues());
      }}
    >
      <FormInput
        type="number"
        min={1}
        max={50}
        className="input input-bordered"
        label="Количество аниме"
        {...form.getInputProps("limit")}
      />
      <FormInput
        type="number"
        min={1}
        max={9}
        placeholder="Введите минимальную оценку"
        className="input input-bordered"
        label="Минимальная оценка"
        {...form.getInputProps("score")}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormCheckboxContainer label="Статус">
          {Object.entries(form.values.status).map((entry) => {
            const [name, values] = entry;
            const { label, checked, excluded } = values;

            const setIsExcluded = () =>
              form.setFieldValue(`status.${name}.excluded`, !excluded);

            const customOnChange = (event: ChangeEvent<HTMLInputElement>) => {
              (
                form.getInputProps(`status.${name}.checked`)
                  .onChange as ChangeEventHandler<HTMLInputElement>
              )(event);
              if (excluded)
                form.setFieldValue(`status.${name}.excluded`, false);
            };

            return (
              <FormIncludeExcludeCheckbox
                key={name}
                label={label}
                isChecked={checked}
                isExcluded={excluded}
                setIsExcluded={setIsExcluded}
                {...form.getInputProps(`status.${name}.checked`)}
                onChange={customOnChange}
              />
            );
          })}
        </FormCheckboxContainer>
        <FormCheckboxContainer label="Эпизод">
          {Object.entries(form.values.duration).map((entry) => {
            const [name, values] = entry;
            const { label, checked, excluded } = values;

            const setIsExcluded = () =>
              form.setFieldValue(`duration.${name}.excluded`, !excluded);

            const customOnChange = (event: ChangeEvent<HTMLInputElement>) => {
              (
                form.getInputProps(`duration.${name}.checked`)
                  .onChange as ChangeEventHandler<HTMLInputElement>
              )(event);
              if (excluded)
                form.setFieldValue(`duration.${name}.excluded`, false);
            };

            return (
              <FormIncludeExcludeCheckbox
                key={name}
                label={label}
                isChecked={checked}
                isExcluded={excluded}
                setIsExcluded={setIsExcluded}
                {...form.getInputProps(`duration.${name}.checked`)}
                onChange={customOnChange}
              />
            );
          })}
        </FormCheckboxContainer>
        <FormCheckboxContainer label="Тип">
          {Object.entries(form.values.kind).map((entry) => {
            const [name, values] = entry;
            const { label, checked, excluded } = values;

            const setIsExcluded = () =>
              form.setFieldValue(`kind.${name}.excluded`, !excluded);

            const customOnChange = (event: ChangeEvent<HTMLInputElement>) => {
              (
                form.getInputProps(`kind.${name}.checked`)
                  .onChange as ChangeEventHandler<HTMLInputElement>
              )(event);
              if (excluded) form.setFieldValue(`kind.${name}.excluded`, false);
            };

            return (
              <FormIncludeExcludeCheckbox
                key={name}
                label={label}
                isChecked={checked}
                isExcluded={excluded}
                setIsExcluded={setIsExcluded}
                {...form.getInputProps(`kind.${name}.checked`)}
                onChange={customOnChange}
              />
            );
          })}
        </FormCheckboxContainer>
        <FormCheckboxContainer label="Рейтинг">
          {Object.entries(form.values.rating).map((entry) => {
            const [name, values] = entry;
            const { label, checked, excluded } = values;

            const setIsExcluded = () =>
              form.setFieldValue(`rating.${name}.excluded`, !excluded);

            const customOnChange = (event: ChangeEvent<HTMLInputElement>) => {
              (
                form.getInputProps(`rating.${name}.checked`)
                  .onChange as ChangeEventHandler<HTMLInputElement>
              )(event);
              if (excluded)
                form.setFieldValue(`rating.${name}.excluded`, false);
            };

            return (
              <FormIncludeExcludeCheckbox
                key={name}
                label={label}
                isChecked={checked}
                isExcluded={excluded}
                setIsExcluded={setIsExcluded}
                {...form.getInputProps(`rating.${name}.checked`)}
                onChange={customOnChange}
              />
            );
          })}
        </FormCheckboxContainer>
      </div>
      <FormToggle
        label="Цензура"
        {...form.getInputProps("censored", { type: "checkbox" })}
      />
      <Button type="submit">Создать</Button>
    </FormContainer>
  );
});
