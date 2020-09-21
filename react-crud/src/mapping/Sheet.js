export class Sheet {
    constructor(post){
        const {
            id,
            artist,
            duration,
            date_added,
            date_modified,
            signature,
            href,
            created_by,
            title,
            composition_date,
            image,
            description,
            tempo
        } = post;
        this.description = description;
        this.image = image;
        this.composition_date = composition_date;
        this.title = title;
        this.id = id;
        this.artist = artist;
        console.log("Duration model", duration);
        try{
            this.duration = duration //duration.split(' ')[0].padStart(5, 0);
        }catch{
            console.log("Error at setting duration: ", duration);
        }
        this.date_added = date_added;
        this.date_modified = date_modified;
        this.signature = signature;
        this.href = href;
        this.created_by = created_by;
        this.tempo = tempo;
    }
}