import { expect, test } from "vitest"
import {
  CityRepositoryMemory,
  LocalRepositoryMemory,
} from "@/infra/repositories/memory"
import { SaveCity, SaveLocal, DeleteLocal } from "@/application/usecases"
import { Address, City } from "@/domain/entities"

test("Deve deletar um local com sucesso", async () => {
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
    openingHours: undefined,
    cityId: city.getCityId(),
    categoryId: "fake-category-id",
  }
  const inputLocal1 = {
    name: "Doce e Companhia",
    description:
      "O melhor lugar da cidade para você tomar um bom café. Fatias de tortas artesanais, bolos, lanches e biscoitos caseiros.",
    images: ["fake-image"],
    address,
    openingHours: undefined,
    cityId: city.getCityId(),
    categoryId: "fake-category-id",
  }
  const localRepository = new LocalRepositoryMemory()
  const saveLocal = new SaveLocal(cityRepository, localRepository)
  await saveLocal.execute(inputLocal)
  await saveLocal.execute(inputLocal1)
  const local = await localRepository.findBySlug("doce-companhia")
  const deleteLocal = new DeleteLocal(cityRepository, localRepository)
  await deleteLocal.execute({ id: local.getLocalId() })
  const locals = await localRepository.findAll()
  const localByCity = await cityRepository.findById(city.getCityId())
  expect(locals).toHaveLength(1)
  expect(localByCity.getLocals()).toHaveLength(1)
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
    openingHours: undefined,
    cityId: city.getCityId(),
    categoryId: "fake-category-id",
  }
  const localRepository = new LocalRepositoryMemory()
  const saveLocal = new SaveLocal(cityRepository, localRepository)
  await saveLocal.execute(inputLocal)
  const deleteLocal = new DeleteLocal(cityRepository, localRepository)
  expect(
    async () => await deleteLocal.execute({ id: "fake-id" })
  ).rejects.toThrow(new Error("Local not found"))
})