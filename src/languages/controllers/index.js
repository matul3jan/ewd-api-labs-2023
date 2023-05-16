import languagesService from "../services";

export default () => {
    const listLanguages = async (request, response) => {
        let languages = await languagesService.find();
        languages = languages.sort((a, b) => a.english_name.localeCompare(b.english_name));
        response.status(200).json(languages);
    };

    return {
        listLanguages,
    };
};
