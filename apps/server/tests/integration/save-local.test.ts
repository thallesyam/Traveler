import { expect, test } from "vitest"
import {
  CityRepositoryMemory,
  LocalRepositoryMemory,
} from "@/infra/repositories/memory"
import { SaveCity, SaveLocal } from "@/application/usecases"
import { Address, City } from "@/domain/entities"

const mockOpeningHours = [
  {
    weekDay: 0,
    open: null,
    close: null,
  },
  {
    weekDay: 1,
    open: new Date().setHours(8, 0, 0, 0) / 1000,
    close: new Date().setHours(18, 0, 0, 0) / 1000,
  },
  {
    weekDay: 2,
    open: new Date().setHours(8, 0, 0, 0) / 1000,
    close: new Date().setHours(18, 0, 0, 0) / 1000,
  },
  {
    weekDay: 3,
    open: new Date().setHours(8, 0, 0, 0) / 1000,
    close: new Date().setHours(18, 0, 0, 0) / 1000,
  },
  {
    weekDay: 4,
    open: new Date().setHours(8, 0, 0, 0) / 1000,
    close: new Date().setHours(18, 0, 0, 0) / 1000,
  },
  {
    weekDay: 5,
    open: new Date().setHours(8, 0, 0, 0) / 1000,
    close: new Date().setHours(18, 0, 0, 0) / 1000,
  },
  {
    weekDay: 6,
    open: new Date().setHours(8, 0, 0, 0) / 1000,
    close: new Date().setHours(18, 0, 0, 0) / 1000,
  },
]

test("Deve criar um local com sucesso", async () => {
  const cityRepository = new CityRepositoryMemory()
  const address = new Address(
    "08225260",
    "Rua Francisco da cunha",
    "Jardim Itapemirim",
    "533",
    { lat: 10, long: 10 }
  )
  const input = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const saveCity = new SaveCity(cityRepository)
  await saveCity.execute(input)
  const city = (await cityRepository.findByName(input.name)) as City
  const inputLocal = {
    name: "Doce & Companhia",
    description:
      "O melhor lugar da cidade para você tomar um bom café. Fatias de tortas artesanais, bolos, lanches e biscoitos caseiros.",
    images: ["fake-image"],
    address,
    openingHours: mockOpeningHours,
    cityId: city.getCityId(),
    categoryId: "fake-category-id",
  }
  const localRepository = new LocalRepositoryMemory()
  const saveLocal = new SaveLocal(cityRepository, localRepository)
  await saveLocal.execute(inputLocal)
  const locals = await localRepository.findAll()
  expect(locals).toHaveLength(1)
  expect(city.getLocals()).toHaveLength(1)
  expect(locals[0].name).toEqual(inputLocal.name)
  expect(locals[0].address).toEqual(address)
  expect(locals[0].description).toEqual(inputLocal.description)
  expect(locals[0].openingHours).toEqual(inputLocal.openingHours)
  expect(locals[0].images).toEqual(inputLocal.images)
  expect(locals[0].city).toEqual(city)
})

test("Deve criar um local com sucesso", async () => {
  const cityRepository = new CityRepositoryMemory()
  const address = new Address(
    "08225260",
    "Rua Francisco da cunha",
    "Jardim Itapemirim",
    "533",
    { lat: 10, long: 10 }
  )
  const input = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const saveCity = new SaveCity(cityRepository)
  await saveCity.execute(input)
  const city = (await cityRepository.findByName(input.name)) as City
  const inputLocal = {
    name: "Doce & Companhia",
    description:
      "O melhor lugar da cidade para você tomar um bom café. Fatias de tortas artesanais, bolos, lanches e biscoitos caseiros.",
    images: ["fake-image"],
    address,
    openingHours: mockOpeningHours,
    cityId: city.getCityId(),
    categoryId: "fake-category-id",
  }
  const localRepository = new LocalRepositoryMemory()
  const saveLocal = new SaveLocal(cityRepository, localRepository)
  await saveLocal.execute(inputLocal)
  expect(async () => await saveLocal.execute(inputLocal)).rejects.toThrow(
    new Error("Local with same name already register")
  )
})