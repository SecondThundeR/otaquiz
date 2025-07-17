import { useForm } from "@mantine/form";
import { type ChangeEvent, type ChangeEventHandler, memo, useCallback } from "react";

import { initialFormValues } from "@/constants/initialFormValues";

import type { useGameCreate } from "@/hooks/useGameCreate";

import { Alert } from "@/ui/Alert";
import { Button } from "@/ui/Button";
import { Spinner } from "@/ui/Spinner";

import { convertObjectValues, type ObjectType } from "@/utils/form/convertObjectValues";
import { getTransformedValues } from "@/utils/form/getTransformedValues";

import { FormCheckboxContainer } from "../FormCheckboxContainer";
import { FormContainer } from "../FormContainer";
import { FormIncludeExcludeCheckbox } from "../FormIncludeExcludeCheckbox";
import { FormInput } from "../FormInput";
import { FormToggle } from "../FormToggle";

export const CustomGameForm = memo(function CustomGameForm({
  isCreating,
  onGameCreate,
}: Omit<ReturnType<typeof useGameCreate>, "isError">) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: initialFormValues,

    transformValues: (values) => {
      const limit = Number(values.limit);
      const score = !values.score ? null : Number(values.score);
      const kind = convertObjectValues(values.kind);
      const status = convertObjectValues(values.status);
      const season = convertObjectValues(values.season);
      const duration = convertObjectValues(values.duration);
      const rating = convertObjectValues(values.rating);

      return {
        limit,
        score,
        censored: values.censored,
        isShowingResult: values.isShowingResult,
        kind: getTransformedValues(kind),
        status: getTransformedValues(status),
        season: getTransformedValues(season),
        duration: getTransformedValues(duration),
        rating: getTransformedValues(rating),
      };
    },
  });

  const { rx } = form.values.rating;
  const isWarningTriggered = rx.checked && !rx.excluded;

  const getCheckboxes = useCallback(
    (obj: ObjectType, objName: string) =>
      Object.entries(obj)
        .sort(([value1], [value2]) => Number(value2) - Number(value1))
        .map(([name, { label, checked, excluded }]) => {
          const setIsExcluded = () => form.setFieldValue(`${objName}.${name}.excluded`, !excluded);

          const customOnChange = (event: ChangeEvent<HTMLInputElement>) => {
            (
              form.getInputProps(`${objName}.${name}.checked`)
                .onChange as ChangeEventHandler<HTMLInputElement>
            )(event);
            if (excluded) form.setFieldValue(`${objName}.${name}.excluded`, false);
          };

          return (
            <FormIncludeExcludeCheckbox
              id={`${objName}.${name}.checked`}
              key={name}
              label={label}
              isChecked={checked}
              isExcluded={excluded}
              setIsExcluded={setIsExcluded}
              {...form.getInputProps(`${objName}.${name}.checked`, {
                type: "checkbox",
              })}
              onChange={customOnChange}
              disabled={isCreating}
            />
          );
        }),
    [form, isCreating],
  );

  return (
    <FormContainer
      onSubmit={async (event) => {
        event.preventDefault();
        await onGameCreate(form.getTransformedValues());
      }}
    >
      <FormInput
        id="limit"
        type="number"
        pattern="[0-9]*"
        min={1}
        max={50}
        className="input input-bordered"
        label="Количество аниме"
        disabled={isCreating}
        {...form.getInputProps("limit", { type: "input" })}
      />
      <FormInput
        id="score"
        type="number"
        pattern="[0-9]*"
        min={1}
        max={9}
        placeholder="Введите минимальную оценку"
        className="input input-bordered"
        label="Минимальная оценка"
        disabled={isCreating}
        {...form.getInputProps("score", { type: "input" })}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormCheckboxContainer label="Статус">
          {getCheckboxes(form.values.status, "status")}
        </FormCheckboxContainer>
        <FormCheckboxContainer label="Эпизод">
          {getCheckboxes(form.values.duration, "duration")}
        </FormCheckboxContainer>
        <FormCheckboxContainer label="Тип">
          {getCheckboxes(form.values.kind, "kind")}
        </FormCheckboxContainer>
        <FormCheckboxContainer label="Сезон">
          {getCheckboxes(form.values.season, "season")}
        </FormCheckboxContainer>
        <FormCheckboxContainer label="Рейтинг" className="sm:col-span-2">
          {getCheckboxes(form.values.rating, "rating")}
        </FormCheckboxContainer>
      </div>
      <FormToggle
        id="censored"
        label="Активировать цензуру"
        {...form.getInputProps("censored", { type: "checkbox" })}
      />
      <FormToggle
        id="isShowingResult"
        label="Результат во время игры"
        disabled={isCreating}
        {...form.getInputProps("isShowingResult", { type: "checkbox" })}
      />
      {isWarningTriggered && (
        <Alert type="warning" fullWidth>
          <strong>Будьте осторожны!</strong>
          <br />
          Данная категория может содержать изображения, не предназначенные для лиц младше 18 лет
          <br />
          Продолжайте на свой страх и риск
        </Alert>
      )}
      <Button type="submit" disabled={isCreating}>
        {!isCreating ? (
          "Начать игру"
        ) : (
          <>
            <Spinner />
            Создание игры
          </>
        )}
      </Button>
    </FormContainer>
  );
});
