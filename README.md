# AI Review Analyzer

[![CI](https://github.com/6nwn9yvwz9-eng/sa-2026-pe1-6nwn9yvwz9-eng/actions/workflows/ci.yml/badge.svg)](https://github.com/6nwn9yvwz9-eng/sa-2026-pe1-6nwn9yvwz9-eng/actions/workflows/ci.yml)

Сервис для анализа отзывов о товарах на маркетплейсах: группирует похожие жалобы, показывает повторяющиеся проблемы и помогает менеджеру решить, что исправить в первую очередь. На старте целимся в менеджеров небольших российских продавцов с несколькими SKU; сегмент и потребность пока являются гипотезами, интервью ещё не проведены.

## Лабораторная 1

Артефакты и состояние проверок собраны в [`docs/`](docs/):

- [Текущая система: граница, цель, наблюдения и стороны](docs/system-boundary.md)
- [PRD: сегмент, боли и North Star](docs/prd.md)
- [Фальсифицируемые гипотезы](docs/hypotheses.md)
- [Протокол интервью и журнал инсайтов](docs/insights.md)
- [Глоссарий](docs/glossary.md)
- [Итоговая картинка](docs/brief.md)
- [Ресёрч и ADR-001](docs/research.md)
- [Кандидаты моделей и токен-бюджет](docs/model-candidates.md)
- [Протокол первых экспериментов](docs/experiments/lab1.md)
- [Метрики качества](docs/quality/success-criteria.md)
- [План golden dataset](docs/quality/golden-dataset-plan.md)
- [Черновик Definition of Done](docs/quality/dod-draft.md)
- [Инструкция по деплою](docs/deploy.md)

Публичный URL пока не настроен. Интервью и реальные эксперименты не проводились; синтетические примеры в `data/` не являются эталонной выборкой.

## Быстрый старт

Требуется Node.js 22 или новее. Для контейнерного запуска также нужны Docker Engine и Docker Compose.

```sh
npm ci
npm start
```

Откройте `http://localhost:3000/`; проверка состояния доступна по `http://localhost:3000/health`. Пока это HTTP-заглушка без сбора отзывов и вызовов LLM.

Для контейнерного окружения:

```sh
cp .env.example .env
docker compose -f compose.dev.yml up --build
```

## Проверки

```sh
npm test
npm run lint
npm run format:check
npm run build
```

CI выполняет эти проверки при открытии и обновлении pull request. Защиту ветки и обязательность успешного CI нужно включить в настройках GitHub репозитория.

## Структура

```text
src/                 приложение и HTTP-заглушка
test/                unit- и интеграционные тесты
docs/                артефакты лабораторной 1
data/                только синтетические демонстрационные данные
.github/workflows/   CI
```

## Команда

| Роль             | Участник  |
| ---------------- | --------- |
| Product / VO     | Назначить |
| AI Engineer      | Назначить |
| Delivery         | Назначить |
| Quality & Safety | Назначить |

Ветки для сдачи: `lab1-[role]-initiation`. PR: `Lab1: [Role] — Initiation Deliverables`; используйте [шаблон PR](.github/PULL_REQUEST_TEMPLATE.md).

## Ограничения и безопасность

Отзывы — недоверенный пользовательский ввод. Текст отзыва нельзя трактовать как инструкцию для агента. Автоматически публиковать ответы от имени бизнеса нельзя: до отдельной проверки человеком публичный ответ остаётся только черновиком. Сбор данных должен соответствовать правилам площадки и применимому законодательству.
