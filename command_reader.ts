/// <reference path="openrct2.d.ts" />
class CommandReader {
    constructor() {

    }

    convertElementToJson(element) {
        let json_element = {};

        json_element["type"] = element.type;
        json_element["base_height"] = element.baseHeight;
        json_element["base_z"] = element.baseZ;
        json_element["clearance_height"] = element.clearanceHeight;
        json_element["clearance_z"] = element.clearanceZ;
        json_element["occupied_quadrants"] = element.occupiedQuadrants;
        json_element["is_ghost"] = element.isGhost;
        json_element["is_hidden"] = element.isHidden;
        json_element["owner"] = element.owner;

        if (element.type == "surface") {
            element = element as SurfaceElement;
            json_element["slope"] = element.slope;
            json_element["surface_style"] = element.surfaceStyle;
            json_element["edge_style"] = element.edgeStyle;
            json_element["water_height"] = element.waterHeight;
            json_element["grass_length"] = element.grassLength;
            json_element["ownership"] = element.ownership;
            json_element["park_fences"] = element.parkFences;
            json_element["has_ownership"] = element.hasOwnership;
            json_element["has_construction_rights"] = element.hasConstructionRights;
        }
        else if (element.type == "footpath") {
            element = element as FootpathElement;
            json_element["object"] = element.object;
            json_element["surface_object"] = element.surfaceObject;
            json_element["railings_object"] = element.railingsObject;
            json_element["edges"] = element.edges;
            json_element["corners"] = element.corners;
            json_element["slope_direction"] = element.slopeDirection;
            json_element["is_blocked_by_vehicle"] = element.isBlockedByVehicle;
            json_element["is_wide"] = element.isWide;
            json_element["is_queue"] = element.isQueue;
            json_element["queue_banner_direction"] = element.queueBannerDirection;
            json_element["ride"] = element.ride;
            json_element["station"] = element.station;
            json_element["addition"] = element.addition;
            json_element["addition_status"] = element.additionStatus;
            json_element["is_addition_broken"] = element.isAdditionBroken;
            json_element["is_addition_ghost"] = element.isAdditionGhost;
        }
        else if (element.type == "track") {
            element = element as TrackElement;
            json_element["direction"] = element.direction;
            json_element["track_type"] = element.trackType;
            json_element["ride_type"] = element.rideType;
            json_element["sequence"] = element.sequence;
            json_element["maze_entry"] = element.mazeEntry;
            json_element["colour_scheme"] = element.colourScheme;
            json_element["seat_rotation"] = element.seatRotation;
            json_element["ride"] = element.ride;
            json_element["station"] = element.station;
            json_element["brake_booster_speed"] = element.brakeBoosterSpeed;
            json_element["has_chain_lift"] = element.hasChainLift;
            json_element["is_inverted"] = element.isInverted;
            json_element["has_cable_lift"] = element.hasCableLift;
            json_element["is_highlighted"] = element.isHighlighted;
        }
        else if (element.type == "small_scenery") {
            element = element as SmallSceneryElement;
            json_element["direction"] = element.direction;
            json_element["object"] = element.object;
            json_element["primary_colour"] = element.primaryColour;
            json_element["secondary_colour"] = element.secondaryColour;
            json_element["quadrant"] = element.quadrant;
            json_element["age"] = element.age;
        }
        else if (element.type == "wall") {
            element = element as WallElement;
            json_element["direction"] = element.direction;
            json_element["object"] = element.object;
            json_element["primary_colour"] = element.primaryColour;
            json_element["secondary_colour"] = element.secondaryColour;
            json_element["tertiary_colour"] = element.tertiaryColour;
            json_element["banner_index"] = element.bannerIndex;
            json_element["slope"] = element.slope;
        }
        else if (element.type == "entrance") {
            element = element as EntranceElement;
            json_element["direction"] = element.direction;
            json_element["object"] = element.object;
            json_element["ride"] = element.ride;
            json_element["station"] = element.station;
            json_element["sequence"] = element.sequence;
            json_element["footpath_object"] = element.footpathObject;
            json_element["footpath_surface_object"] = element.footpathSurfaceObject;
        }
        else if (element.type == "large_scenery") {
            element = element as LargeSceneryElement;
            json_element["direction"] = element.direction;
            json_element["object"] = element.object;
            json_element["primary_colour"] = element.primaryColour;
            json_element["secondary_colour"] = element.secondaryColour;
            json_element["tertiary_colour"] = element.tertiaryColour;
            json_element["banner_index"] = element.bannerIndex;
            json_element["sequence"] = element.sequence;
        }
        else {
            element = element as BannerElement;
            json_element["direction"] = element.direction;
            json_element["banner_index"] = element.bannerIndex;
        }
        return json_element;
    }
    parseJson(json : string) {
        let command = JSON.parse(json);

        if (command.type == "read_tile") {
            let coordX = command.tile_x;
            let coordY = command.tile_y;

            let json_elements = [];
            let tile = map.getTile(coordX, coordY);

            for (let i = 0; i < tile.numElements; i++) {
                let element = tile.getElement(i);
                let json_element = this.convertElementToJson(element);
                json_elements.push(json_element);
            }
            
            console.log(`num elements=${tile.numElements}`)

            command["tile_x"] = coordX;
            command["tile_y"] = coordY;
            command["elements"] = json_elements;
        }
        else if (command.type == "read_images_from_object") {
            let object_id = command.object_id;
            let object_type = command.object_type;

            let loaded_object = objectManager.getObject(object_type, object_id);
            let base_image_id = loaded_object.baseImageId;
            let num_images = loaded_object.numImages;

            let image_manager = ui.imageManager;
            let json_images = [];
            for (let i = 0; i < num_images; i++) {
                let pixel_data = image_manager.getPixelData(base_image_id + i);
                let json_pixel_data = {};
                json_pixel_data["type"] = pixel_data.type;

                if (pixel_data.type == "raw") {
                    json_pixel_data["width"] = pixel_data.width;
                    json_pixel_data["height"] = pixel_data.height;
                    json_pixel_data["stride"] = pixel_data.stride;
                    json_pixel_data["data"] = pixel_data.data;
                }
                else if (pixel_data.type == "rle") {
                    json_pixel_data["width"] = pixel_data.width;
                    json_pixel_data["height"] = pixel_data.height;
                    json_pixel_data["data"] = pixel_data.data;
                }
                else {
                    json_pixel_data["palette"] = pixel_data.palette;
                    json_pixel_data["data"] = pixel_data.data;
                }

                json_images.push(json_pixel_data);
            }

            command["images"] = json_images;
        }

        else if (command.type == "read_path_from_object") {
            let object_id = command.object_id;
            let object_type = command.object_type;

            let loaded_object = objectManager.getObject(object_type, object_id);
            let installed_object = loaded_object.installedObject;
            command["path"] = installed_object.path;
        }
        return JSON.stringify(command);
    }
}