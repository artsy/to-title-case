import { isAllCapitalized, isIrregularCapitalized, toTitleCase } from ".."

describe("dsa", () => {
    expect(isAllCapitalized("HELLO WORLD")).toBeTruthy()
    expect(isAllCapitalized("HELLO_WORLD")).toBeTruthy()
    expect(isAllCapitalized("Hello World")).toBeFalsy()
    expect(isAllCapitalized("HELLO World")).toBeFalsy()
    expect(isAllCapitalized("hello world")).toBeFalsy()
})

describe("Title Case Text", () => {
  it("should correctly check all capitalized words", () => {
    expect(isAllCapitalized("HELLO WORLD")).toBeTruthy()
    expect(isAllCapitalized("HELLO_WORLD")).toBeTruthy()
    expect(isAllCapitalized("Hello World")).toBeFalsy()
    expect(isAllCapitalized("HELLO World")).toBeFalsy()
    expect(isAllCapitalized("hello world")).toBeFalsy()
  })

  it("should correctly check irregular capitalization", () => {
    expect(isIrregularCapitalized("hello")).toBeFalsy()
    expect(isIrregularCapitalized("hello user")).toBeFalsy()
    expect(isIrregularCapitalized("HELLO")).toBeFalsy()
    expect(isIrregularCapitalized("hello 123")).toBeFalsy()
    expect(isIrregularCapitalized("helloà")).toBeFalsy()
    expect(isIrregularCapitalized("hellO")).toBeTruthy()
    expect(isIrregularCapitalized("first_naMe")).toBeTruthy()
    expect(isIrregularCapitalized("heLlo UsEr")).toBeTruthy()
    expect(isIrregularCapitalized("aBcDe")).toBeTruthy()
    expect(isIrregularCapitalized("hellO 123")).toBeTruthy()
    expect(isIrregularCapitalized("helloàÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ")).toBeTruthy()
  })

  it("should format the text correctly", () => {
    expect(toTitleCase("hello world")).toBe("Hello World")
    expect(toTitleCase("musée picasso")).toBe("Musée Picasso")
    expect(toTitleCase("alpha 137 gallery")).toBe("Alpha 137 Gallery")
    expect(toTitleCase("new union gallery")).toBe("New Union Gallery")
    expect(toTitleCase("123 456 789")).toBe("123 456 789")
    expect(toTitleCase("who are so beguiled")).toBe("Who Are So Beguiled")
    expect(toTitleCase("Lorem Ipsum Is Simply Dummy Text of the Printing and Typesetting Industry")).toBe(
      "Lorem Ipsum Is Simply Dummy Text of the Printing and Typesetting Industry"
    )
  })

  it("should format the lowercase words correctly", () => {
    expect(toTitleCase("first World")).toBe("First World")
    expect(toTitleCase("end to end gallery")).toBe("End to End Gallery")
    expect(toTitleCase("large (Over 100)")).toBe("Large (over 100)")
    expect(toTitleCase("artsy X capsule auctions")).toBe("Artsy x Capsule Auctions")
  })

  it("should format the special characters correctly", () => {
    expect(toTitleCase("$whatever space")).toBe("$Whatever Space")
    expect(toTitleCase("something [special]")).toBe("Something [Special]")
    expect(toTitleCase("first_name")).toBe("First_name")
    expect(toTitleCase("hang-up gallery")).toBe("Hang-Up Gallery")
    expect(toTitleCase("sotheby's")).toBe("Sotheby's")
    expect(toTitleCase("rago/wright")).toBe("Rago/Wright")
    expect(toTitleCase("name (Description)")).toBe("Name (Description)")
    expect(toTitleCase('"hello" name')).toBe('"Hello" Name')
  })

  it("should capitalize the first and last words", () => {
    expect(toTitleCase("the example word")).toBe("The Example Word")
    expect(toTitleCase("something new")).toBe("Something New")
    expect(toTitleCase("example word the")).toBe("Example Word The")
  })

  it("don't change the capital words", () => {
    expect(toTitleCase("HOFA gallery (house of fine art)")).toBe("HOFA Gallery (House of Fine Art)")
    expect(toTitleCase("HoFa gallery")).toBe("HoFa Gallery")
    expect(toTitleCase("eHDC gallery")).toBe("eHDC Gallery")
  })
})
